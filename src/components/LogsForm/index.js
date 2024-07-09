import React, { useState } from 'react';
import './index.css';

const LogForm = () => {
  const [udpEnabled, setUdpEnabled] = useState(true);
  const [tcpEnabled, setTcpEnabled] = useState(true);
  const [tlsEnabled, setTlsEnabled] = useState(true);
  const [privateKeyPassword, setPrivateKeyPassword] = useState('');
  
  return (
    <div className="log-form">
      <div className="input-settings">
        <h2>Input Settings</h2>
        <div className="setting-row">
          <div className="setting">
            <label>
              <input type="checkbox" checked={udpEnabled} onChange={() => setUdpEnabled(!udpEnabled)} />
              UDP
            </label>
            <input type="number" placeholder="Port (1-65535)" defaultValue={514} />
          </div>
          <div className="setting">
            <label>
              <input type="checkbox" checked={tcpEnabled} onChange={() => setTcpEnabled(!tcpEnabled)} />
              TCP
            </label>
            <input type="number" placeholder="Port (1-65535)" defaultValue={1514} />
          </div>
        </div>
        <div className="setting-row">
          <div className="setting">
            <label>
              <input type="checkbox" checked={tlsEnabled} onChange={() => setTlsEnabled(!tlsEnabled)} />
              TLS
            </label>
            <input type="number" placeholder="Port (1-65535)" defaultValue={6514} />
            <div className="certificate">
              <label>Certificate (X509) - Public Key (*.crt / *.pem)</label>
              <input type="file" />
              <button>Upload</button>
              <button>Remove</button>
              <div className="certificate-status">
                <p>Public Key Certificate: <span className="expired">Expired</span></p>
                <p>Detail: The X509 certificate [nfury-laptop-win] is not valid. Either expired or yet to be valid.</p>
                <p>Subject: CN=nfury-laptop-win, OrgUnit=, Org=</p>
                <p>Issuer: CN=PPLAB-AD-PRIMARY-CA, OrgUnit=, Org=</p>
                <p>Valid From: Friday, April 1, 2022 at 4:05:30 PM GMT+05:30</p>
                <p>Valid Upto: Sunday, March 31, 2024 at 4:05:30 PM GMT+05:30</p>
                <p>Algorithm: SHA-256withRSA</p>
              </div>
            </div>
          </div>
          <div className="setting">
            <label>Private Key Password</label>
            <input type="password" value={privateKeyPassword} onChange={(e) => setPrivateKeyPassword(e.target.value)} />
            <div className="certificate">
              <label>Certificate - Private Key (*.key)</label>
              <input type="file" />
              <button>Upload</button>
              <button>Remove</button>
              <div className="certificate-status">
                <p>Private Key: <span className="valid">Valid</span></p>
                <p>Detail: </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="save-button">Save</button>
    </div>
  );
};

export default LogForm;
