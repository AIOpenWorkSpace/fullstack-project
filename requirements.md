# Software Requirements

## Vision:

The vision of this product is to provide parents with a comprehensive tool that enables them to make informed decisions about the TV shows and movies their young-teen kids consume. By offering summaries, editable rating categories, and the ability to customize content analysis, the product aims to promote thoughtful media consumption aligned with family values. This project solves the pain point of parents seeking guidance in assessing and discussing adult content with their children, fostering critical thinking and responsible media consumption.

## Scope (In/Out)

### IN

- The tool will provide summaries of TV shows and movies, allowing parents to evaluate content in categories such as language usage, alcohol and other drugs, portrayal of sex and romantic relationships, positive role models, positive messages, diverse representation, violence, and product placement.
- Users will be able to edit the summaries and assign their own ratings to align with their own thoughts and values.
- The tool will allow the saving of results to a watch list, enabling users to review and modify ratings and notes from previous sessions.
- Integration with Auth0 will provide secure login functionality for users, ensuring the privacy and confidentiality of their data.

### OUT

- The product will not provide real-time streaming of TV shows or movies (training data only up to date with ChatGPT data)
- The product will not generate records for shows which do not exist as of ChatGPT's training data

## Minimum Viable Product (MVP) functionality:

- Summaries and editable ratings for TV shows and movies in categories aligned with family values.
- Saving and reviewing of results, including modified ratings and notes from previous sessions.
- Integration with Auth0 for secure user login.

Stretch goals:

- Integration with external APIs or databases to fetch additional information about TV shows and movies, such as genre, parental guidance ratings, or critical reviews.

## Data Flow

- User logs in securely using Auth0.
- User searches for a TV show or movie.
- The tool retrieves relevant summaries and rating categories for the selected content.
- User saves to watch list and edits the summaries and assigns star ratings based on their own thoughts and values.
- User saves the modified ratings and notes to their watch list.
- User can review and update the saved ratings and notes in subsequent sessions.
- See readme.md for detailed domain model and data schema


## Non-Functional Requirements

- Security: The application will implement Auth0 for authentication
- Usability: The user interface will be intuitive and user-friendly, ensuring ease of navigation and interaction.
