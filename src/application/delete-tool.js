import { DeleteUtilityTool } from '../domain/delete';

export class UtilityToolRemovalListener {  
    #confirmationModal = document.querySelector('[data-remove-tool-confirmation-modal]');
    #targetTool;
    #handlerCallback;

    constructor(root) {
        this.root = root;
        this.#setConfirmationModal();
    }

    listen(callback) {
        this.root.addEventListener('click', async (event) => {
            const { target } = event;
            const element = target.parentElement;

            event.preventDefault();
            
            if(element.getAttribute('data-utility-tool-element') === 'button') {
                this.#targetTool = element;
                this.#handlerCallback = callback;

                this.#confirmationModal.showModal();
            }
        })
    }

    #setConfirmationModal() {
        this.#confirmationModal.addEventListener('click', (event) => {
            const { target } = event;

            if(target.hasAttribute('data-cancel')) {
                this.#confirmationModal.close();
            }
            else if(target.hasAttribute('data-confirm')) {
                new UtilityToolRemovalHandler(this.#targetTool).handle(this.#handlerCallback);
            
                this.#confirmationModal.close();
            }
        });

        this.#confirmationModal.addEventListener('close', () => {
            this.#targetTool = null;
            this.#handlerCallback = undefined;
        })
    }
}

class UtilityToolRemovalHandler {
    constructor(target) {
        this.target = target;
    }

    handle(callback) {
        try {
            const uTool = this.target.parentElement;
            const id = uTool.id;
                
            new DeleteUtilityTool().delete(id);
                
            callback(uTool);
        }
        catch(error) {
            console.log(error);
        }
    }
}
