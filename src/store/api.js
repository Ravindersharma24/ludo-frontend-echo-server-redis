import { createAction } from "@reduxjs/toolkit"


export const apiCallStart = createAction('apiCallStart')
export const apiCallSuccess = createAction('apiCallSuccess')
export const apiCallFailed = createAction('apiCallFailed')
