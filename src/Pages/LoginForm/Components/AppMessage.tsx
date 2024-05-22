// React Imports
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

// App Message Component
export function AppMessageEmailVerification({ onResend, cooldown })
{
  const isCooldownActive = cooldown > 0;
  return (
    <div id="App-message">
      <p>Check your email inbox, and spam folders</p>
      <button onClick={onResend} disabled={isCooldownActive}>{isCooldownActive ? `Resend in ${cooldown}s` : 'Resend Verification Email'}</button>
    </div>
  );
}

export function AppMessageEmailResendVerification({ onResend, cooldown })
{
  const isCooldownActive = cooldown > 0;
  return (
    <div id="App-message">
      <p>Verification email re-sent, please check your inbox.</p>
      <button onClick={onResend} disabled={isCooldownActive}>{isCooldownActive ? `Resend in ${cooldown}s` : 'Resend Verification Email'}</button>
    </div>
  );
}

export function AppMessageSuccessful()
{
  return (
    <div id="App-message">
      <p>Login Successful</p>
    </div>
  );
}

export function AppMessageError({ errorMessage })
{
  return (
    <div id="App-message">
      <p>Something went wrong!</p>
      {errorMessage && <h5>{errorMessage.message}</h5>}
    </div>
  );
}
