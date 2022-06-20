import { request } from 'umi';

export const GetUserList = () => {
  return request('/persons', {
    method: 'GET',
  });
};

export const GetGreeting = () => {
  return request('/greeting', {
    method: 'GET',
  });
};
