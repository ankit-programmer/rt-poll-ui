import React, { useEffect, useReducer, useState } from 'react';
import styles from './StaticPage.module.css';

const AboutPage = (params: any) => {

    return (
        <div className={styles.Page}>
            <h1>About Us</h1>
            <br></br>
            <br></br>
            <div>
                Welcome to RTPoll, the newest and freshest player in the online poll game! We&apos;re here to make decision-making as easy as pie (or pizza, if that&apos;s your thing).
            </div>
            <br></br>
            <div>
                We know that meetings can be long and tedious, especially when it comes to making decisions. That&apos;s why we created RTPoll - to make the process quick and painless. With RTPoll, you can create polls with multiple choice questions, invite your team members to participate, and view results in real-time. No more waiting for responses or trying to schedule meetings that work for everyone.
            </div>
            <br></br>
            <div>
                But we&apos;re not just about speed. We also care about the little things, like data privacy and security. So don&apos;t worry, we&apos;ll only store the information that&apos;s absolutely necessary for the report and we follow industry standard data protection regulations.
            </div>
            <br></br>
            <div>
                We&apos;re also all about flexibility. That&apos;s why we offer anonymous polls, so you can gather honest and candid opinions without anyone feeling self-conscious. Plus, you can add images to your polls to make them more visually engaging and easy to understand.
            </div>
            <br></br>
            <div>
                We&apos;re just 90 days old, but we&apos;re already making waves in the online poll world. Join us and see the difference RTPoll can make for your team&apos;s decision-making process. It&apos;s time to take the &quot;ugh&quot; out of meetings and put the &quot;ahh&quot; in decisions.
            </div>
            <br></br>
            <div>
                We hope you enjoy using our app as much as we enjoyed making it!
            </div>
            <br></br>
            <div>
                So, Don&apos;t wait and try RTPoll today!
            </div>
            <br></br>
        </div>
    )
}

export default AboutPage;