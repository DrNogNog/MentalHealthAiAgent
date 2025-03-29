#  1) specify tools
#  2) specify tool list


# take user query ---> disect keyword ---> read textbook table of content with keyword in mind 
#                                            -> navigate to section of highlighted keyword
#                                               -> extract information from section             ---> 
# This is a note on the general idea:
# 0) get person's query  (text variable VoiceSynthesizer.tsx)
# 1) read textbook        (RAG)
# 2) extract information  
# 3) calculate potential of user to fit into symptoms and conditions based on query
# 4) formulate potential responses to user based on weighted potentials
# 5) formulate and send response to user
# 6) generate excel document (chart; issue; symptoms; things that might help) 
# 7) send to email

# There are two ways we can do this:
# Method 1) Based on Bob Ziroll's course content module 2 on coursera

# systemPrompt = "You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final 
# Answer. Your final answer should be highly specific to the observation you have from running 
# the actions.
# 1. Thought: Describe your thoughts about the question you have been asked.
# 2. Action: run one fo the actions available to you - then return PAUSE.
# 3. PAUSE
# 4. Observation: will be the result of running those actions.

# Available actions: (tool list)
# - getBookContent:
#     E.g. identifyRelatedBookContent: null
#     Returns the current .
# - formulateConditionLikeliness : 
#     E.g. formulateConditionLikeliness : Array of Strings
#     Returns a object detailing conditions and their likeliness

# Example session:
# Question: I have homework due in five days, but I don't feel like doing it at all. I feel really bad.
# Thought: I should lookup the data that fits the description of this query. 
# Action: identifyRelatedBookContent: null (The table of contents may be too precise words to use to cast a net on what the user may be feeling.)
# PAUSE

# You will be called again with output from the Action in a way like this:
# Observation: [... Array of strings of extracted text]

# Then you loop again:
# Thought: To create a more suitable responses, I should calculate the likeliness of different condtions that 
#           the user exhibits based on the context of their query.
            # (This might be a little hard, even if we want to pinpoint a single condition. Thats alot of texts to go through, and alot of unweighted text too. )
# Action: formulateConditionLikeliness: [... Array of strings of extracted text]
# PAUSE

# You'll then be called again with something like this:
# Observation:  { "Anxiety Disorder" : "30%" ...}

# You then output:
# Answer: <I am so sorry to hear that. Are you likely feeling anxious as well?>"


# Method 2) Function Calling
# In this method, we do not give the LLM a detailed instruction on how to interact with the user query and the tool.
# It is more organic, such that the LLM will decided what tools to use based on its own understanding of the user query.
# We will simply make all the tools and put it into a list that the LLM will use.


# Bottom line is, we will have to get started on building the tools and a major bottleneck will be text extraction, comprehension, and evaluation. 