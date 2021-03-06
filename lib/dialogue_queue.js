// -*- mode: js; indent-tabs-mode: nil; js-basic-offset: 4 -*-
//
// This file is part of Almond
//
// Copyright 2020 The Board of Trustees of the Leland Stanford Junior University
//
// Author: Giovanni Campagna <gcampagn@cs.stanford.edu>
//
// See COPYING for details
"use strict";

const assert = require('assert');
const Semantic = require('./semantic');
const Intent = Semantic.Intent;

class QueueItem {
    constructor(setupPromise = true) {
        this._promise = undefined;
        if (setupPromise) {
            this._promise = new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        }
    }

    get promise() {
        return this._promise;
    }
}

class UserInput extends QueueItem {
    constructor(intent, confident) {
        super(false);
        assert(intent instanceof Intent);
        this.intent = intent;
        this.confident = confident;
    }

    // UserInput queue items don't return a value, so these methods are stubs
    resolve() {}
    reject() {}

    toString() {
        return `UserInput(${this.intent})`;
    }
}
UserInput.prototype.isUserInput = true;
QueueItem.UserInput = UserInput;

class Notification extends QueueItem {
    constructor(appId, icon, outputType, outputValue) {
        super();
        this.appId = appId;
        this.icon = icon;
        this.outputType = outputType;
        this.outputValue = outputValue;
    }

    toString() {
        return `Notification(${this.appId}, ${this.outputType})`;
    }
}
Notification.prototype.isNotification = true;
QueueItem.Notification = Notification;

class Error extends QueueItem {
    constructor(appId, icon, error) {
        super();
        this.appId = appId;
        this.icon = icon;
        this.error = error;
    }

    toString() {
        return `Error(${this.appId}, ${this.error})`;
    }
}
Error.prototype.isError = true;
QueueItem.Error = Error;

class Question extends QueueItem {
    constructor(appId, icon, type, question) {
        super();
        this.appId = appId;
        this.icon = icon;
        this.type = type;
        this.question = question;
    }

    toString() {
        return `Question(${this.appId}, ${this.type}, ${this.question})`;
    }
}
Question.prototype.isQuestion = true;
QueueItem.Question = Question;

class PermissionRequest extends QueueItem {
    constructor(principal, identity, program) {
        super();
        this.principal = principal;
        this.identity = identity;
        this.program = program;
    }

    toString() {
        return `PermissionRequest(${this.principal}, ${this.identity})`;
    }
}
PermissionRequest.prototype.isPermissionRequest = true;
QueueItem.PermissionRequest = PermissionRequest;

class InteractiveConfigure extends QueueItem {
    constructor(kind) {
        super();
        this.kind = kind;
    }

    toString() {
        return `InteractiveConfigure(${this.kind})`;
    }
}
InteractiveConfigure.prototype.isInteractiveConfigure = true;
QueueItem.InteractiveConfigure = InteractiveConfigure;

class RunProgram extends QueueItem {
    constructor(program, uniqueId, identity) {
        super();
        this.program = program;
        this.uniqueId = uniqueId;
        this.identity = identity;
    }

    toString() {
        return `RunProgram(${this.uniqueId})`;
    }
}
RunProgram.prototype.isRunProgram = true;
QueueItem.RunProgram = RunProgram;

module.exports = QueueItem;
