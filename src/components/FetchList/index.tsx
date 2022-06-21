import React from 'react';
import { useReducer, useState } from 'react';
import { useRequest } from 'umi';
import { Spin, Select, Button } from 'antd';
import { GetGreeting } from '../../service/index';

interface Person {
  uuid: string;
  name: string;
}

const initialState = {
  error: null,
  greeting: null,
};

function greetingReducer(state, action) {
  switch (action.type) {
    case 'SUCCESS': {
      return {
        error: null,
        greeting: action.greeting,
      };
    }
    case 'ERROR': {
      return {
        error: action.error,
        greeting: null,
      };
    }
    default: {
      return state;
    }
  }
}

export const FetchList = () => {
  const [{ error, greeting }, dispatch] = useReducer(
    greetingReducer,
    initialState,
  );

  const [buttonClicked, setButtonClicked] = useState(false);

  const buttonText = buttonClicked ? 'Ok' : 'Load Greeting';

  const fetchGreeting = async () =>
    GetGreeting()
      .then((response) => {
        const { data } = response;
        const { greeting } = data;
        dispatch({ type: 'SUCCESS', greeting });
        setButtonClicked(true);
      })
      .catch((error) => {
        dispatch({ type: 'ERROR', error });
      });

  return (
    <>
      <button onClick={() => fetchGreeting()} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </>
  );
};
