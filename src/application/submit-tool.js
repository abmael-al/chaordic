import { CreateUtilityTool } from '../domain/create'; 

export class SubmitUtilityToolListener {  
    constructor(form) {
        this.form = form;
    }

    listen(callback) {  
        this.form.addEventListener('submit', async () => {
            new UtilityToolSubmitHandler(this.form).submit(callback);
        });
    }
}

export class UtilityToolSubmitHandler {
    constructor(form) {
        this.form = form;
        this.inputFields = this.form.querySelectorAll('input');
    }

    async submit(callback) {
        try {
            const formData = new InputFieldsValuesFormater().format(this.inputFields);           
            const item = await new CreateUtilityTool().post(formData);
            
            new InputFieldsCleaner().clean(this.inputFields);

            callback(item);
        }
        catch(error) {
            console.log(error);
        }
    }
}

class InputFieldsValuesFormater {
    format(inputFields) {
        const fields = Array.from(inputFields);
                
        const values = fields.reduce((acc, input) => {   
                const key = input.id;
                const value = this.#getValue(key, input);
    
                return ({
                    ...acc,
                    [key] : value
                });
            }, {}
        );

        return values;
    }

    #getValue(key, input) {
        return (key !== 'tags') ? input.value : input.value.split(' ');
    }
}

class InputFieldsCleaner {
    async clean(inputFields) {
        inputFields.forEach((field) => {
            field.value = '';
        });
    }
}
