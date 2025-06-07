(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

const taxToggle = document.getElementById("flexSwitchCheckDefault");

taxToggle.addEventListener("click", () => {
    const withTax = document.querySelectorAll(".price-with-tax");
    const withoutTax = document.querySelectorAll(".price-without-tax");

    withTax.forEach(el => el.style.display = taxToggle.checked ? "inline" : "none");
    withoutTax.forEach(el => el.style.display = taxToggle.checked ? "none" : "inline");
});