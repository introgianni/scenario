scenarioApp.service('drawGraphService', function() {
    var draw = function(json) {

        flare = JSON.parse(json);

        // Tolgo il grafico se c'è già
        var contenitore = d3.select("#contenitore");
        if (contenitore) contenitore.remove();

        if (!flare) {
            d3.select("#left").append("div")
                .attr("id", "contenitore")
                .append("h1").html("Non ci sono dati per questa combinazione");
            return;
        }
        // constants
        var margin = 20,
            width = 960,
            height = 500 - .5 - margin,
            color = d3.interpolateRgb("#f77", "#77f");
        var data;

        var margin = {
                top: 20,
                right: 120,
                bottom: 20,
                left: 120
            },
            width = document.getElementById("left").offsetWidth,
            height = document.getElementById("left").offsetHeight;

        var i = 0,
            duration = 750,
            root, rectW = 180,
            rectH = 50;

        var tree = d3.layout.tree()
            .size([height, width]);

        /*
        var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y, d.x]; }); */
        var diagonal = d3.svg.diagonal()
            .projection(function(d) {
                return [d.y + rectW / 2, d.x + rectH / 2];
            });

        function redraw() {
            //console.log("here", d3.event.translate, d3.event.scale);
            svg.attr("transform",
                "translate(" + d3.event.translate + ")" +
                " scale(" + d3.event.scale + ")");
        }

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
            d.clicked = false;
        }

        // Consente di spezzare le strighe per farle rientrare nel box
        function wrap(text, width) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    x = text.attr("x")
                dy = parseFloat(text.attr("dy"));

                var box = text.node().getBBox();
                // Dovrò spezzare il testo
                var numSpezzature = 1;
                if (box.width > width) {
                    numSpezzature += Math.floor(box.width / width);
                }
                if (numSpezzature > 1) {
                    // numero pari di righe
                    if (numSpezzature % 2 === 0) {
                        dy = dy - ((lineHeight / 2) * (numSpezzature / 2));
                    } else {
                        dy = dy - (lineHeight * ((numSpezzature - 1) / 2));
                    }
                }
                var tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    }
                }
            });
        }

        var w = document.getElementById("left").offsetWidth;
        var h = document.getElementById("left").offsetHeight;

        var scale = 1;
        var zoomWidth = (w - scale * w);
        var zoomHeight = (h - scale * h);
        console.log("zoomWidth " + zoomWidth);
        console.log("zoomHeight " + zoomHeight);
        console.log("h " + document.getElementById("left").offsetHeight);
        console.log("w " + document.getElementById("left").offsetWidth);
        var svg = d3.select("body").select("#left")
            .append("div")
            .attr("id", "contenitore")
            .classed("svg-container", true) //container class to make it responsive
            .append("svg")
            .attr("id", "svgcanvas")
            //responsive SVG needs these 2 attributes and no width and height attr
            .attr("preserveAspectRatio", "none")
            .attr("viewBox", "0 0 " + w + " " + h)
            .call(zm = d3.behavior.zoom().on("zoom", redraw))
            .append("g")
            .attr("transform", "translate(" + 0 + "," + 0 + ")scale(" + scale + ")")
            //class to make it responsive
            .classed("svg-content-responsive", true);

        // Resetta lo stato dello zoom al valore iniziale che ho impostato nell'svg
        zm.translate([0, 0]).scale(1);

        var container = svg.append("g");

        if (flare) {
            root = flare;
            root.x0 = height / 2;
            root.y0 = 0;



            root.children.forEach(collapse);

            window.addEventListener('resize', resize2);

            function resize2() {
                var w = document.getElementById("left").offsetWidth;
                var h = document.getElementById("left").offsetHeight;
                var w1, h1;
                var w2, h2;
                var w3, h3;
                w1 = window.innerWidth;
                h1 = window.innerHeight;
                if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
                    w2 = document.documentElement.clientWidth;
                    h2 = document.documentElement.clientHeight;
                }
                if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                    w3 = document.body.clientWidth;
                    h3 = document.body.clientHeight;
                }
                document.getElementById("svgcanvas")
                    .setAttribute("viewBox", "0 0 " + w + " " + h);
                console.log('XxY');
            }

            update(root);
        }

        d3.select(self.frameElement).style("height", "800px");

        function update(source) {


            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) {
                d.y = d.depth * 250;
            });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function(d) {
                    return d.id || (d.id = ++i);
                });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on("click", click);

            nodeEnter.append("rect")
                .attr("width", rectW)
                .attr("height", rectH)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });

            nodeEnter.append("text")
                .attr("x", rectW / 2)
                .attr("y", rectH / 2)
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                //.attr("textLength", 200)
                //.attr("lengthAdjust","spacing")
                .text(function(d) {
                    return d.name;
                });

            nodeEnter.select("text")
                .call(wrap, 160);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            nodeUpdate.select("rect")
                .attr("width", rectW)
                .attr("height", rectH)
                .attr("rx", 15)
                .attr("ry", 15)
                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .style("fill", function(d) {

                    if (d.clicked || d.clicked === undefined) return "#ffcc00";
                    else if (d._children === null || d._children === undefined || d._children.length === 0) return "#ffffff";
                    else if (d._children.length > 0) return "#ff0000";
                    //return d._children ? "ff0000" : "#0000ff";
                });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            nodeExit.select("rect")
                .attr("width", rectW)
                .attr("height", rectH)
                //.attr("width", bbox.getBBox().width)""
                //.attr("height", bbox.getBBox().height)
                .attr("stroke", "black")
                .attr("stroke-width", 1);

            nodeExit.select("text");

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function(d) {
                    return d.target.id;
                });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("x", rectW / 2)
                .attr("y", rectH / 2)
                .attr("d", function(d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function click(d) {
            //Collassa i nodi fratelli
            if (d.parent) {
                d.parent.children.forEach(function(child) {
                    if (child.id !== d.id) {
                        collapse(child);
                    }
                });
            }
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            d3.select("#nome-dettaglio").remove();
            d3.select("#link-dettaglio").remove();
            var cfu, codice, nota_pre, nota_post;
            cfu = d.data.cfu;
            codice = d.data.af_gen_cod;
            nota_pre = d.data.nota_pre;
            nota_post = d.data.nota_post;
            d3.select("#dettagli").append("div").attr("id", "nome-dettaglio").append("label").html(d.name);
            if (cfu) {
                d3.select("#nome-dettaglio").append("div").attr("id", "cfu-insegnamento").html("Crediti formativi: " + cfu);
            }
            if (codice) {
                d3.select("#nome-dettaglio").append("div").attr("id", "codice-insegnamento").html("Codice del corso: " + codice);
            }
            if (nota_pre) {
                d3.select("#nome-dettaglio").append("div").attr("id", "notapre-insegnamento").html("Nota 1: " + nota_pre);
            }
            if (nota_post) {
                d3.select("#nome-dettaglio").append("div").attr("id", "notapost-insegnamento").html("Nota 2: " + nota_post);
            }
            d3.select("#dettagli").append("div").attr("id", "link-dettaglio").html("<a href=\"" + d.data.url + "\" target=\"_blank\">Apri la pagina informativa in nuova finestra</a>");
            d.clicked = true;
            update(d);
        }

    };

    return {
        draw: draw
    };
});
