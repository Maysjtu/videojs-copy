/**
 * @file modal-dialog.js
 */
import * as Dom from './utils/dom';
import * as Fn from './utils/fn';
import Component from './component';
import window from 'global/window';
import document from 'global/document';

const MODAL_CLASS_NAME = 'vjs-modal-dialog';
const ESC = 27;

/**
 * The `ModalDialog` displays over the video and its controls, which blocks
 * interaction with the player until it is closed.
 *
 * Modal dialogs include a "Close" button and will close when that button
 * is activated - or when ESC is pressed anywhere.
 *
 * @extends Component
 */
class ModalDialog extends Component {
    constructor(player, options) {
        super(player, options);
        this.opened_ = this.hasBeenOpened_ = this.hasBeenFilled_ = false;

        this.closeable(!this.options_.uncloseable);
        this.content(this.options_.content);

        // Make sure the contentEl is defined AFTER any children are initialized
        // because we only want the contents of the modal in the contentEl
        // (not the UI elements like the close button).
        this.contentEl_ = Dom.createEl('div', {
            className: `${MODAL_CLASS_NAME}-content`
        }, {
            role: 'document'
        });

        this.descEl_ = Dom.createEl('p', {
            className: `${MODAL_CLASS_NAME}-description vjs-control-text`,
            id: this.el().getAttribute('aria-describedby')
        });

        Dom.textContent(this.descEl_, this.description());

        this.el_.appendChild(this.descEl_);
        this.el_.appendChild(this.contentEl_);
    }
    /**
     * Create the `ModalDialog`'s DOM element
     *
     * @return {Element}
     *         The DOM element that gets created.
     */
    createEl() {
        return super.createEl('div', {
            className: this.buildCSSClass(),
            tabIndex: -1
        }, {
            'aria-describedby': `${this.id()}_description`,
            'aria-hidden': 'true',
            'aria-label': this.label(),
            'role': 'dialog'
        });
    }

    dispose() {
        this.contentEl_ = null;
        this.descEl_ = null;
        this.previouslyActiveEl_ = null;

        super.dispose();
    }
    /**
     * Builds the default DOM `className`.
     *
     * @return {string}
     *         The DOM `className` for this object.
     */
    buildCSSClass() {
        return `${MODAL_CLASS_NAME} vjs-hidden ${super.buildCSSClass()}`;
    }

    /**
     * Handles `keydown` events on the document, looking for ESC, which closes
     * the modal.
     *
     * @param {EventTarget~Event} e
     *        The keypress that triggered this event.
     *
     * @listens keydown
     */
    handleKeyPress(e) {
        if (e.which === ESC && this.closeable()) {
            this.close();
        }
    }
    /**
     * Returns the label string for this modal. Primarily used for accessibility.
     *
     * @return {string}
     *         the localized or raw label of this modal.
     */
    label() {
        return this.localize(this.options_.label || 'Modal Window');
    }
    /**
     * Returns the description string for this modal. Primarily used for
     * accessibility.
     *
     * @return {string}
     *         The localized or raw description of this modal.
     */
    description() {
        let desc = this.options_.description || this.localize('This is a modal window.');

        // Append a universal closeability message if the modal is closeable.
        if (this.closeable()) {
            desc += ' ' + this.localize('This modal can be closed by pressing the Escape key or activating the close button.');
        }

        return desc;
    }

    /**
     * Opens the modal.
     *
     * @fires ModalDialog#beforemodalopen
     * @fires ModalDialog#modalopen
     */
    open() {
        if(!this.opened_) {
            const player = this.player();
            /**
             * Fired just before a `ModalDialog` is opened.
             *
             * @event ModalDialog#beforemodalopen
             * @type {EventTarget~Event}
             */
            this.trigger('beforemodalopen');
            this.opened_ = true;
            // Fill content if the modal has never opened before and
            // never been filled.
            if (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) {
                this.fill();
            }
            // If the player was playing, pause it and take note of its previously
            // playing state.
            this.wasPlaying_ = !player.paused();

            if(this.options_.pauseOnOpen && this.wasPlaying_) {
                player.pause();
            }
            if (this.closeable()) {
                this.on(this.el_.ownerDocument, 'keydown', Fn.bind(this, this.handleKeyPress));
            }
            // Hide controls and note if they were enabled.
            this.hadControls_ = player.controls();
            player.controls(false);

            this.show();
            this.conditionalFocus_();
            this.el().setAttribute('aria-hidden', 'false');

            /**
             * Fired just after a `ModalDialog` is opened.
             *
             * @event ModalDialog#modalopen
             * @type {EventTarget~Event}
             */
            this.trigger('modalopen');
            this.hasBeenOpened_ = true;
        }
    }
    /**
     * If the `ModalDialog` is currently open or closed.
     *
     * @param  {boolean} [value]
     *         If given, it will open (`true`) or close (`false`) the modal.
     *
     * @return {boolean}
     *         the current open state of the modaldialog
     */
    opened(value) {
        if (typeof value === 'boolean') {
            this[value ? 'open' : 'close']();
        }
        return this.opened_;
    }

    /**
     * Closes the modal, does nothing if the `ModalDialog` is
     * not open.
     *
     * @fires ModalDialog#beforemodalclose
     * @fires ModalDialog#modalclose
     */
    close() {
        if (!this.opened_) {
            return;
        }
        const player = this.player();
        /**
         * Fired just before a `ModalDialog` is closed.
         *
         * @event ModalDialog#beforemodalclose
         * @type {EventTarget~Event}
         */
        this.trigger('beforemodalclose');
        this.opened_ = false;

        if (this.wasPlaying_ && this.options_.pauseOnOpen) {
            player.play();
        }

        if (this.closeable()) {
            this.off(this.el_.ownerDocument, 'keydown', Fn.bind(this, this.handleKeyPress));
        }

        if (this.hadControls_) {
            player.controls(true);
        }
        this.hide();
        this.el().setAttribute('aria-hidden', 'true');

        /**
         * Fired just after a `ModalDialog` is closed.
         *
         * @event ModalDialog#modalclose
         * @type {EventTarget~Event}
         */
        this.trigger('modalclose');
        this.conditionalBlur_();
        if (this.options_.temporary) {
            this.dispose();
        }
    }











}