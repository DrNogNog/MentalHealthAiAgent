"# Working on creating a therapist based on a book" 
# This project is currently in development. It should use langgraph to access your emails and mistral ocr to access a book pdf on depressive disorders to extract into text for prompt generation
# in each of the nodes of the langgraph
# we should then do data analysis work with tabeleau on growing depression amongst people and in certain areas.
# The backend folder contains all LLM calls,
# while the front end is everything else, please use npm run start

# Frontend (src) -----------------------------------------------------------------------------------

# main.tsx
This is where the react frontend is loaded.

# index.css
This is a generic styling file

# App.tsx
This is the main file where the frontend elements are created and rendered.

There are currently six states for the App.tsx file.
- message (first chatbox)
- messageTwo (bottom chatbox)
- email (current user's input email)
- activeVoice (current user's selected voice)
- direction (TBD)
- currentSuggestions (user's selected conversation suggestion)

Suggestions are optional strings users can click on to put into the user query.

Voices are voices that user can select to say the AI responses.

Its components are found in the components directory, which includes:
- Navbar
- NFTGrid
- Profile Page
- Upload Page
- Voice Synthesizer

# Navbar.tsx
This file holds the navigation bar component that lets the user naviage to the following pages:
- Upload Documents (uploads the APA doc and anything else the user wants to upload to the agent)
- Voice AI
- Profile
- NFT (nft generation)


# NFTGrid.tsx
This file generates nfts that will be stored on the backend database.
This will be the reward system for any potential users to incentivize
continued usage.

# ProfilePage.tsx
This file keeps a tab on the NFTs. The NFTs will be grabbed from the database (TBD) 
and their details will be shown on this page.

# UploadPage.tsx
This file lets the user upload documents (into the backend) for the AI to read.

# VoiceSynthesizer.tsx 
This file is used to produce the actual sound of the voices.

# Backend-------------------------------------------------------------------------------

# mistralai.py
This is the file that holds the ai used to read the document and process its contents.

# ----------------------------------------------------------------------------------------
# schemas.py, tool_executor.py, and other files not mentioned above.
These files are currently not being used at all and may be subject to disposal.




#############
# Notice:
*Please run on chrome browser. The frontend does not load on other chromium browsers and non-chromium browsers*
To run and install dependencies:
1) enter into terminal and run "npm install"
2) enter into terminal and run "npm run start"