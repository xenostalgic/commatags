Tumblr treats commas as tag separators, which means you can't have them show up in your final tags at all. This can be frustrating, since a phrase containing commas may be an evocative or expressive tag that you wnat to be able to search and curate.

Hyphens are used as word separators in tag urls: if you use the tag "#this is a tag" on your blog [xenostalgic.tumblr.com](https://xenostalgic.tumblr.com), you can look it up at [xenostalgic.tumblr.com/tagged/this-is-a-tag](https://xenostalgic.tumblr.com/tagged/this-is-a-tag). Unfortunately, this means that while Tumblr lets you type hyphens in your tags, there is no /tagged/ page for a hyphenated tag. Clicking on "#semi-serious problem" will take you to [xenostalgic.tumblr.com/tagged/semi-serious-problem](https://xenostalgic.tumblr.com/tagged/semi-serious-problem), but that's the page for posts tagged "#semi serious problem"--and it won't include posts tagged with the original hyphenated tag "#semi serious problem".

Fortunately, unicode characters U+201A: SINGLE LOW-9 QUOTATION MARK and U+2011: NON-BREAKING HYPHEN look very much like a comma and a hyphen, respectively, and can be used in tags as regular characters without side-effects.

>$ python commatags.py a semi-hyphenated tag, but with multiple words
>
>a semi‑hyphenated tag‚ but with multiple words

Paste the revised tag in and you're good to go!
