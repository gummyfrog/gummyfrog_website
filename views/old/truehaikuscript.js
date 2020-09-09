document.getElementById("haikuButton").addEventListener("click", function(){
    clearCorpus();
    var corpus = document.getElementById("inputBox").value;
    courpus = corpus.replace(/[^\w\s]/gi, '')
    corpus = corpus.toLowerCase();
    corpus = corpus.split(' ');

    massSort(corpus);

    var returnText = haiku();

    if(returnText.includes('undefined')) {
      returnText = "Sylb is trying to access a word with a syllable count that isn't in the corpus. Try putting some more words in. I wrote a method that generates haikus with only the words you put in, but it's very sloppy. Try it out with the button that says 'True Haiku.'"
    }

    document.getElementById("sylbData").innerHTML = returnDBCount();
    document.getElementById("haikuBox").value = returnText;
});

document.getElementById("trueHaikuButton").addEventListener("click", function(){
    clearCorpus();
    var corpus = document.getElementById("inputBox").value;
    courpus = corpus.replace(/[^\w\s]/gi, '')
    corpus = corpus.toLowerCase();
    corpus = corpus.split(' ');

    massSort(corpus);

    var returnText = trueHaiku();

    if(returnText.includes('undefined')) {
      returnText = "Sylb can't make a haiku out of whatever you put into the box."
    }

    document.getElementById("sylbData").innerHTML = returnDBCount();
    document.getElementById("haikuBox").value = returnText;
});
