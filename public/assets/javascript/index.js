$(document).ready(function() {
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    // Render the page once it's done loading
    initPage();
  
    function initPage() {
        // Empty the article container, run an AJAX request for any unsaved headlines
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then(function(data) {
        if (data && data.length) {
            renderArticles(data);
        } else {
            // Otherwise render a message explaing we have no articles
            renderEmpty();
        }
      });
    }
  
    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel = $([
            "<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h3>",
            "<a class='article-link' target='_blank' href='" + article.url + "'>",
            article.headline,
            "</a>",
            "<a class='btn btn-primary save'>",
            "Save Article",
            "</a>",
            "</h3>",
            "</div>",
            "<div class='panel-body'>",
            article.summary,
            "</div>",
            "</div>"].join("")
        );
        panel.data("_id", article._id);
        return panel;
    }
  
    function renderEmpty() {
        var emptyAlert = $([
            "<div class='alert alert-warning text-center'>",
            "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
            "</div>",
            "</div>"].join("")
        );
        articleContainer.append(emptyAlert);
    }
  
    function handleArticleScrape() {
        $.get("/api/fetch").then(function(data) {
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
        });
    }

    function handleArticleSave() {
        console.log("tryna save");
        var articleToSave = $(this).parents(".panel").data();
        console.log(articleToSave);

        $.ajax({
            method: "PUT",
            url: "/api/headlines/" + articleToSave._id,
            data: articleToSave
        }).then(function(data) {
            if (data.ok) {
                initPage();
            }
        });
    }
});