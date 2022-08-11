import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from '../Pages/Home.js';
import { BrowserRouter } from 'react-router-dom';

 test('should render the search box', async () => {
     render(<BrowserRouter ><Home/></BrowserRouter>);
     const srchbox = await screen.findByRole("textbox");
     expect(srchbox).toBeInTheDocument();
})

test('should display placeholder value', async () => {
    render(<BrowserRouter ><Home/></BrowserRouter>);
     expect(await screen.findByPlaceholderText(/Search Here/i)).toBeInTheDocument(); 
})

test('should get entered value', async () => {
    render(<BrowserRouter ><Home/></BrowserRouter>);
    const val = await screen.findByPlaceholderText<HTMLInputElement>(/Search Here/i);
    fireEvent.change(val, {
        target: {
            value: "Response"
    }}
    )
     expect(val.value).toBe("Response");
})

test('should display no match when no record found', async () => {
    render(<BrowserRouter ><Home/></BrowserRouter>);
    const val = await screen.findByPlaceholderText(/Search Here/i);
    fireEvent.change(val, {
        target: {
            value: "someMeaninglessRandomWordsss"
    }}
    )
     expect(await screen.findByText("No Match Found")).toBeVisible();
})

test('should', async () => {
    render(<BrowserRouter ><Home/></BrowserRouter>);
    expect((await screen.findByTestId('main'))).toBeInTheDocument();
    expect((await screen.findByTestId('main')).childElementCount).toBe(2);
})

test('should', async () => {
    render(<BrowserRouter ><Home/></BrowserRouter>);
    expect((await screen.findByTestId('navDiv'))).toBeInTheDocument();
    // expect((await screen.findByTestId('navDiv')).childElementCount).toBe(4);

})



