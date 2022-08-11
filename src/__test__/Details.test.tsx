import Details from '../Pages/Details';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import React from 'react';

test("should render input element", async () => {
    render(<BrowserRouter><Details /></BrowserRouter>);
    // const divElement = screen.getByRole('main');
    expect(screen.getByRole('heading')).toBeInTheDocument;
    // expect(divElement.childNodes).toBeTruthy();
  });

  test("should render input element", async () => {
    render(<BrowserRouter><Details /></BrowserRouter>);
    const divElement = screen.getByTestId('jsonData');
    expect(divElement.childElementCount).toBe(1);
  });