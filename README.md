# URL Redirection Page

This project demonstrates a simple HTML page that redirects users based on a parameter in the URL.

## Overview

The HTML page in this project checks for a specific parameter (`redirectTo`) in the URL. If the parameter exists, the page automatically redirects the user to the URL specified by the parameter value. This functionality can be useful for scenarios where you need to redirect users based on dynamic parameters, such as in email campaigns or marketing links.

## How It Works

- When the page loads, it extracts the query parameters from the URL using JavaScript.
- It looks for the `redirectTo` parameter in the URL.
- If the `redirectTo` parameter exists, the page redirects the user to the specified URL.
- If the `redirectTo` parameter is not provided, the page does nothing.

## Usage

To use this redirection page:

1. Deploy the HTML file (`index.html`) to your web server or hosting provider.
2. Share URLs with the `redirectTo` parameter appended, like this: `https://yourdomain.com/index.html?redirectTo=destination-url`.
3. When users visit the URL, they will be automatically redirected to the specified destination URL.

## Example

Suppose you want to redirect users to `https://mydomain.com` when they visit `https://yourdomain.com/?redirectTo=https://mydomain.com`. You can achieve this by deploying the provided `index.html` file to your server and sharing the appropriate URLs with the `redirectTo` parameter.

## Repository Structure

- `index.html`: The HTML file containing the redirection logic.
- `README.md`: This README file providing information about the project.

## Support

If you encounter any issues or have questions about this project, feel free to [open an issue](link-to-issue-tracker) in the repository.

## License

This project is licensed under the [MIT License](link-to-license-file).
