$(document).ready(function () {
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    $('#taxForm').submit(function (event) {
        event.preventDefault();

        // Hide all error icons initially
        $('.error-icon').hide();

        // Get user inputs
        let income = parseFloat($('#income').val());
        let extraIncome = parseFloat($('#extraIncome').val());
        let deductions = parseFloat($('#deductions').val());
        let age = $('#age').val();

        // Validate inputs
        let isValid = true;
        if (isNaN(income) || income < 0) {
            $('#incomeError').show();
            isValid = false;
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            $('#extraIncomeError').show();
            isValid = false;
        }
        if (isNaN(deductions) || deductions < 0) {
            $('#deductionsError').show();
            isValid = false;
        }
        if (age === '') {
            $('#ageError').show();
            isValid = false;
        }

        if (isValid) {
            // Perform tax calculation
            let tax = 0;
            if (income + extraIncome - deductions > 8) {
                if (age === '<40') {
                    tax = 0.3 * (income + extraIncome - deductions - 8);
                } else if (age === '≥40 & <60') {
                    tax = 0.4 * (income + extraIncome - deductions - 8);
                } else if (age === '≥60') {
                    tax = 0.1 * (income + extraIncome - deductions - 8);
                }
            }

            // Show result modal
            $('#resultBody').html('<p>Tax to be paid: ' + tax.toFixed(2) + ' Lakhs</p>');
            $('#resultModal').modal('show');
        }
    });
});
