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
    ...testOne,
    author: ""
}


test('renders component without errors', ()=> {
    render(<Article article = { testOne }/>);

});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article = { testOne }/>);

    const headline = screen.getByText(/test article/i);
    const author = screen.getByText(/test author/i);

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article = { testTwo }/>);

    const assocPress = screen.getByText(/associated press/i);

    expect(assocPress).toBeInTheDocument();
});


test('executes handleDelete when the delete button is pressed', ()=> {
    const handleDelete = jest.fn();
    
    render(<Article article = { testOne } handleDelete = { handleDelete }/>);

    const button = screen.getByTestId('deleteButton');
    userEvent.click(button)

    expect(handleDelete).toHaveBeenCalled();
});

