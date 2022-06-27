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
