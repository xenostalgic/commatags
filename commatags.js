//* TITLE commatags **//
//* VERSION 1.0.0 **//
//* DESCRIPTION	**//
//* DEVELOPER xenostalgic **//
//* FRAME false **//
//* BETA false **//

/*
TODO:
- use jquery selection instead of janky default getElementsByClassName() and indexing
- use XKit interface to get post tag div if possible??
- figure out whether window.getSelection and sel.getRangeAt and sel.rangeCount are safe requirements
- make replacements user-definable?
- make it possible to skip the default stripping of other characters like " and #. This might be
	doable by changing the behavior on the Enter key--instead of whatever default, add tag with specified text?
	maybe XKit's add-tag function still goes through that interface though, but if so too bad, can't be helped
	...maybe can just directly hack in a new div with the specified text? sounds ugly tho
*/

XKit.extensions.commatags = new Object({

	running: false,

	preferences: {
		"sep0": {
			text: "User interface options",
			type: "separator"
		},
		"replace_comma": {
			text: "Replace comma with U+201A 'SINGLE LOW-9 QUOTATION MARK'. You will no longer be able to separate tags by pressing comma",
			default: true,
			value: true
		},
		"replace_hyphen": {
			text: "Replace hyphen with U+2011 'NON-BREAKING HYPHEN'. This allows you to distinguish space-separated and hyphen-separated words in tag urls.",
			default: true,
			value: true
		}
	},

	run: function() {
		this.running = true;
		var script = document.createElement("script");
		script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			document.body.appendChild(script);
			}, 
			false);
		document.body.appendChild(script);
		XKit.interface.post_window_listener.add("commatags_listener", XKit.extensions.commatags.new_post_check);	
	},

	new_post_check: function() {
		tagEditor = $(".tag-input-wrapper .editor-plaintext");
		if (tagEditor.length == 0) return;
		tagEditor[0].onkeydown = function(evt) {
			sp = tagEditor.children[0];
			tagAltered = false;
			t = "";

			console.log("shiftKey:", evt.shiftKey);
			console.log("keyCode:", evt.keyCode);
			if (!evt.shiftKey) {
				// currently only adds the new character at the end even if that's not where the cursor is
				if (((evt.key && evt.key == ",") || (!evt.key && evt.keyCode == 188)) && XKit.extensions.commatags.preferences.replace_comma.value == true) { 
					// replace with Unicode Character 'SINGLE LOW-9 QUOTATION MARK' (U+201A)
					evt.preventDefault();
					t = String.fromCodePoint(8218);
					tagAltered = true;
					console.log('replace comma');
				} else if (((evt.key && evt.key == "-") || (!evt.key && evt.keyCode == 189)) && XKit.extensions.commatags.preferences.replace_hyphen.value == true) { 
					// replace with Unicode Character 'NON-BREAKING HYPHEN' (U+2011)
					evt.preventDefault();
					t = String.fromCodePoint(8209);
					tagAltered = true;
					console.log('replace hyphen');
				}
			}
			if (tagAltered) {
				if (window.getSelection) {
					sel = window.getSelection();
					if (sel.getRangeAt && sel.rangeCount) {
						range = sel.getRangeAt(0);
						range.deleteContents();
						range.insertNode( document.createTextNode(t));
						range.collapse(false);
					}
				}
			}
		}
	},

	destroy: function() {
		this.running = false;
	}

});