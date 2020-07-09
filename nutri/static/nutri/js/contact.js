'use strict';
/*
    Show the notification message passed by the id.
    Replace the inactive class for appearce class.
    Set a timeout of 3 seconds to close the notification.
*/
const show_notification = (id_notification) => {
    const elem = document.getElementById(id_notification);
    elem.classList.replace('inactive', 'appearce');
    //Close the notification after 3 seconds
    setTimeout(()=> elem.querySelector('.delete').click(), 3000);
}

/*
    Fetch the contact form data to backend.
    Disable the form elements when click submit button.
    Enable the form elements when receive the response and reset the form.
*/
const sendContact = (e) => {
    e.preventDefault();

    const form = e.target;
    const btn_submit = document.getElementById('contact-form-submit');
    const data = new FormData(form);

    //Disable all inputs and buttons
    form.querySelectorAll('input,textarea, button').forEach(e => e.disabled = true);;
    //Put a loader in button
    btn_submit.classList.add('is-loading');
    
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
        }
    }).then(res => res.json())
    .then(data => {
        console.log(`The email sending was ${data.success}`);

        //Show the notification
        let notification = data.success?'contact-success':'contact-failed';
        show_notification(notification);
        //Disable all inputs and buttons
        form.querySelectorAll('input,textarea, button').forEach(e => e.disabled = false);
        //Remove the loader in button
        btn_submit.classList.remove('is-loading');
        //Reset the form values
        form.reset();
    })
    .catch(err => {
        console.error(err);
        //Disable all inputs and buttons
        form.querySelectorAll('input,textarea, button').forEach(e => e.disabled = false);
        //Remove the loader in button
        btn_submit.classList.remove('is-loading');
    });
}

/*
    Catch the event attached to document.
*/
function loadEvents() {
    const form = document.getElementById('contact-form');
    //Add the submit form event
    form.addEventListener('submit', sendContact, false);

    //Check the validity of and input and show the help message
    document.addEventListener('input', (e) => {
        const elem = e.target;

        // Add the class is-danger to input email when is not valid
        if (elem.nodeName == 'INPUT' && elem.type == 'email' || elem.type == 'tel') {
            if (elem.validity.valid || elem.value === '') {
                elem.classList.add('valid-input');
                elem.classList.remove('is-danger');
            } else {
                elem.classList.remove('valid-input');
                elem.classList.add('is-danger');
            }
        }
    }, false);

    document.addEventListener('click', (e)=> {
        const elem = e.target;
        //Close the notification message when click on X button
        if (elem.nodeName == 'BUTTON' && elem.classList.contains('delete')) {
            elem.parentNode.classList.replace('appearce', 'inactive');
        }
    }, false);
}

//Run loadEvents function when load the HTML
document.addEventListener('DOMContentLoaded', loadEvents, false);
