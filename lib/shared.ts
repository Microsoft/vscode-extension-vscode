/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

'use strict';

var request = require('request');

export function getContents(url, token, callback) {
    var headers = {
        'user-agent': 'nodejs'
    };

    if (token) {
        headers['Authorization'] = 'token ' + token;
    }

    var options: any = {
        url: url,
        headers: headers
    };

    if (process.env.npm_config_strict_ssl === 'false') {
        options.strictSSL = false;
    }

    if (process.env.npm_config_proxy) {
        options.proxy = process.env.npm_config_proxy;
    }

    request.get(options, function (error, response, body) {
        if (!error && response && response.statusCode >= 400) {
            error = new Error('Request returned status code: ' + response.statusCode + '\nDetails: ' + response.body);
        }

        callback(error, body);
    });
}