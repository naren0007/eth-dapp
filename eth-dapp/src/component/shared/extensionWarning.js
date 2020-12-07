import React, { Component } from 'react';


const ExtensionWarning = () => {
    return (
        <div className="extensionWarning">
            <span>
                Weenus requires the <a target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" rel="noopener noreferrer" style={{ color: 'rgb(251 255 187)' }}>Metamask extension</a>
                </span>
                <a target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
                </a>
        </div>
    );
}

export default ExtensionWarning;