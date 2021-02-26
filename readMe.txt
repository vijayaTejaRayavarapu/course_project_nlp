Data Preprocessing steps:
1.) Removing html tags and english content from Sanskrit dataset.
2.) Making sure each verse is present seperated by a blank line in Sanskrit. Unless clubbed intentionally each verse should have | in first line and || in second line and for clubbed the same sequence is to be followed begininning with | and ending with ||
3.) Removing introductions and other irrelevant lines from English dataset.
4.) Blank line between each english translation.
5.) We can add 'START_' and '_END' tags to beginning and endings of English translations. Reason: For SANS-ENG Since decoder would be one step ahead START_ would provide the buffer and _END would be useful in seperating sentences clearly.
6.) Draw Zipf's law plots for both English and Sanskrit to understand the distribution and frequency rankings of words in each language from the available datasets.
7.) Check average sentence lengths. Would be useful while training to decide on dimensionality of the matrices.

We would need to perform Sandhi splitting, lemmatizing etc while vectorizing.