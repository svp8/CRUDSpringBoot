import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export const getFormErrors=(form: AbstractControl) =>{
    if (form instanceof FormControl) {
        // Return FormControl errors or null
        return form.errors ?? null;
    }
    else if (form instanceof FormGroup) {
        const groupErrors = form.errors;
        // Form group can contain errors itself, in that case add'em
        const formErrors = groupErrors ? {groupErrors} : {};
        Object.keys(form.controls).forEach(key => {
            // Recursive call of the FormGroup fields
            const error = getFormErrors(form.get(key));
            if (error !== null) {
                // Only add error if not null
                formErrors[key] = error;
            }
        });
        // Return FormGroup errors or null
        return Object.keys(formErrors).length > 0 ? formErrors : null;
    }
    else return "kek"
}