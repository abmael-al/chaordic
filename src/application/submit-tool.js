class InputFieldsCleaner {
    async clean(inputFields) {
        inputFields.forEach((field) => {
            field.value = '';
        });
    }
}
