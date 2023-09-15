<template>
    <div class="row">
        <div class="col-md-9">
            <h2>Contact Form</h2>
            <form action="php/contact-form.php" id="contact-form">

                <div class="alert alert-success hidden" id="contact-alert-success">
                    <strong>Success!</strong> Thank you for your message. Reply will be in a while!
                </div>
                <div class="alert alert-danger hidden" id="contact-alert-error">
                    <strong>Error!</strong> Something went wrong sending your message.
                </div>

                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Name <span class="required">*</span></label>
                            <input type="text"
                                value=""
                                data-msg-required="Please enter your name."
                                class="form-control"
                                name="name" id="name">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Email <span class="required">*</span></label>
                            <input type="email" 
                                value=""
                                data-msg-required="Please enter your email address."
                                data-msg-email="Please enter a valid email address."
                                class="form-control"
                                name="email"
                                id="email">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Subject</label>
                            <input type="text" 
                                value=""
                                data-msg-required="Please enter the subject."
                                class="form-control"
                                name="subject"
                                id="subject">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Message <span class="required">*</span></label>
                            <textarea
                                data-msg-required="Please enter your message."
                                rows="10"
                                class="form-control"
                                name="message"
                                id="message"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <input type="submit" value="Send Message" class="btn btn-primary" data-loading-text="Loading...">
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-3">
            <hr class="visible-sm visible-xs lg">
            <!-- Widget :: Contacts Info -->
            <div class="contacts-widget widget widget__sidebar">
                <h3 class="widget-title">Contact Us</h3>
                <div class="widget-content">
                    <ul class="contacts-info-list">
                        <li>
                            <i class="fa fa-envelope"></i>
                            <span class="info-item">
                                <a href="#">info@gunkustom.com</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /Widget :: Contacts Info -->
        </div>
    </div>
</template>