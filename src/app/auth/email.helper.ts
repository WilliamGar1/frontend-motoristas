import { Injectable }    from '@angular/core';

export function isValidEmail(email: string):boolean {
    let mailValido = false;
      'use strict';

      var EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

      if (email.match(EMAIL_REGEX)){
        mailValido = true;
      }
    return mailValido;
}