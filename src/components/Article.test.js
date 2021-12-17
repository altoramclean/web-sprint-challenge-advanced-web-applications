import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';


import userEvent from '@testing-library/user-event';

import Article from './Article';

const testOne = {
    id: 1,
    headline: "test article",
    createdOn: "test createdOn",
    author:"test author",
    image: 134,
    summary: "test summary",
    body: "test body"   
};
const testTwo = {
    id: 1,
    headline: "test article",
    createdOn: "test createdOn",
    author:"",
    image: 134,
    summary: "test summary",
    body: "test body" 
}


test('renders component without errors', ()=> {
    render(<Article article = { testOne }/>);

});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article = { testOne }/>);

    const headline = screen.getByText(/test article/i);
    const author = screen.getByText(/test author/i);

    expect(headline).toBeInTheDocument();
    expect(headline).toBeTruthy()

    expect(author).toBeInTheDocument();
    expect(author).toBeTruthy()

});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testTwo}/>);

    const author = screen.queryByTestId(/author/i);

    expect(author).toBeInTheDocument();
    expect(author).toHaveTextContent(/Associated Press/i)

});


test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    
    render(<Article article = { testOne } handleDelete = { handleDelete }/>);

    const button = screen.getByTestId(/deleteButton/i)
    userEvent.click(button);

    expect(handleDelete).toBeCalledTimes(1);
    expect(handleDelete).toBeCalled();

});

