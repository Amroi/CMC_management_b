import { READ_MSG } from './action-types';

// 接收已读信息的同步action
export const readMsg = count => ({ type: READ_MSG, data: count })