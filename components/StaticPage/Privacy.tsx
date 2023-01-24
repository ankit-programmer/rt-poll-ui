import React, { useEffect, useReducer, useState } from 'react'
import style from './StaticPage.module.css';

const PrivacyPage = (params: any) => {

    return (
        <div className={style.Page}>
            <h1>Privacy Policy</h1>
            <br></br>
            <br></br>
            <p>RTPoll (&quot;we&quot; or &quot;us&quot;) is committed to protecting your personal information and your privacy. This privacy policy applies to all of the services offered by RTPoll, including our website and mobile application (collectively, the &quot;Services&quot;).</p>
            <br></br>
            <b>Information We Collect</b>
            <br></br>
            <p>When you use the Services, we may collect the following types of information:</p>
            <br></br>
            <ul>
                <li>Personal information, such as your name, email address, and phone number, that you provide when you register for an account or participate in a poll.</li>
                <br></br>
                <li>Information about your use of the Services, such as the polls you participate in and the results of those polls.</li>
                <br></br>
                <li>Technical information, such as your IP address, browser type, and device type, that is automatically collected when you use the Services.</li>
            </ul>
            <br></br>
            <p>We may also collect information from other sources, such as publicly available databases or other third parties, to supplement the information we collect through the Services.</p>
            <br></br>
            <b>Use of Information</b>
            <br></br>
            <p>We use the information we collect to provide, maintain, and improve the Services, and to communicate with you about the Services. We may also use the information for other purposes, such as to personalize your experience on the Services, to respond to your inquiries, or to provide you with information about our products or services.</p>
            <br></br>
            <b>Sharing of Information</b>
            <br></br>
            <p>We will not share your personal information with third parties for their own marketing purposes without your consent. We may share your personal information with third parties for other purposes, such as to comply with legal requirements, to provide the Services, or to protect our rights and the rights of others.</p>
            <br></br>
            <b>Security</b>
            <p>We take reasonable steps to protect the information we collect from unauthorized access, use, or disclosure. However, no security measures are perfect and we cannot guarantee that your information will never be accessed, used, or disclosed in a manner that is inconsistent with this privacy policy.</p>
            <br></br>
            <b>Changes to this Privacy Policy</b>
            <p>We may update this privacy policy from time to time. If we make any changes, we will post the updated policy on our website and update the &quot;Effective Date&quot; at the top of this policy.</p>
            <p>Contact Us</p>
            <p>If you have any questions or concerns about this privacy policy, please contact us at <b>support@rtpoll.com</b>.</p>
            <p>This privacy policy is effective as of 2023-01-23.</p>
            <br></br>
        </div>
    )
}

export default PrivacyPage;