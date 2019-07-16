/* global QUnit, $, testLog */

(function() {
    var viewer;

    QUnit.module('ReferenceStrip', {
        beforeEach: function () {
            $('<div id="example"></div>').appendTo("#qunit-fixture");

            testLog.reset();
        },
        afterEach: function () {
            if (viewer && viewer.close) {
                viewer.close();
            }

            viewer = null;
        }
    });

    // ----------
    var createViewer = function(options) {
        options = options || {};
        viewer = OpenSeadragon(OpenSeadragon.extend({
            id:            'example',
            prefixUrl:     '/build/openseadragon/images/',
            springStiffness: 100 // Faster animation = faster tests
        }, options));
    };

    // ----------
    QUnit.test('basics', function(assert) {
        var done = assert.async();
        createViewer({
            sequenceMode: true,
            showReferenceStrip: true,
            tileSources: [
                '/test/data/tall.dzi',
                '/test/data/wide.dzi',
            ]
        });

        assert.ok(viewer.referenceStrip, 'referenceStrip exists');
        done();
    });

    // ----------
    QUnit.test('shadow dom', function(assert) {
        var done = assert.async();

        class ShadowElem extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.innerHTML = `<div id="shadow-example"></div>`

                createViewer({
                    element: this.shadowRoot.querySelector('#shadow-example'),
                    sequenceMode: true,
                    showReferenceStrip: true,
                    tileSources: [
                        '/test/data/tall.dzi',
                        '/test/data/wide.dzi',
                    ]
                });
            }
        }
        window.customElements.define('shadow-elem', ShadowElem);

        $('<shadow-elem></shadow-elem>').appendTo("#qunit-fixture");

        assert.ok(viewer.referenceStrip, 'referenceStrip exists');
        done();
    })

})();
