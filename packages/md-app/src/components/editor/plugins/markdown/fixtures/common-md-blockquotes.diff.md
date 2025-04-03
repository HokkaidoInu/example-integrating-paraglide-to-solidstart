# Diff Results for common-md-blockquotes

## Test Summary

- 🟢 Perfect roundtrip (input = output): 0/9 (0%)
- 🟡 Acceptable transformation (output ≠ input, output = expected): 0/9 (0%)
- 🔴 Failing test (output ≠ input, output ≠ expected): 9/9 (100%)

**Overall Status**: ❌ 9 failing tests

---

<details open>
<summary><span style="color:red; font-weight:bold;">tc - simple blockquote.</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 50%">Input</th>
<th style="width: 50%">Actual Output</th>
</tr>
<tr>
<td>

> This is a simple blockquote.

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>&gt; This is a simple blockquote.</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - multi line blockquote.</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 33%">Original Input</th>
<th style="width: 33%">Expected Output</th>
<th style="width: 33%">Actual Output</th>
</tr>
<tr>
<td>

> This blockquote
> spans multiple lines
> in the source Markdown.

</td>
<td>

> This blockquote
spans multiple lines
in the source Markdown.

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>&gt; This blockquote
&gt; spans multiple lines
&gt; in the source Markdown.</code></pre>

</td>
<td>

<pre><code>&gt; This blockquote
spans multiple lines
in the source Markdown.</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - blockquote - inline formatting</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 33%">Original Input</th>
<th style="width: 33%">Expected Output</th>
<th style="width: 33%">Actual Output</th>
</tr>
<tr>
<td>

> This blockquote contains **formatted** text with *emphasis* and `code`.

</td>
<td>

> This blockquote contains **formatted** text with _emphasis_ and `code`.

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>&gt; This blockquote contains **formatted** text with *emphasis* and `code`.</code></pre>

</td>
<td>

<pre><code>&gt; This blockquote contains **formatted** text with _emphasis_ and `code`.</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - blockquote - with link</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 50%">Input</th>
<th style="width: 50%">Actual Output</th>
</tr>
<tr>
<td>

> This blockquote contains a [link](https://example.com).

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>&gt; This blockquote contains a [link](https://example.com).</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - blockquote - nested</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 50%">Input</th>
<th style="width: 50%">Actual Output</th>
</tr>
<tr>
<td>

> Nested blockquotes:
> > This is a nested blockquote.
> > > This is a deeply nested blockquote.

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>&gt; Nested blockquotes:
&gt; &gt; This is a nested blockquote.
&gt; &gt; &gt; This is a deeply nested blockquote.</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - blockquote - multiple paragraphs</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 50%">Input</th>
<th style="width: 50%">Actual Output</th>
</tr>
<tr>
<td>

> Blockquote with multiple paragraphs:
>
> This is the second paragraph in the blockquote.
>
> This is the third paragraph in the blockquote.

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>&gt; Blockquote with multiple paragraphs:
&gt;
&gt; This is the second paragraph in the blockquote.
&gt;
&gt; This is the third paragraph in the blockquote.</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - blockquote - containing markdown</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 50%">Input</th>
<th style="width: 50%">Actual Output</th>
</tr>
<tr>
<td>

> Blockquote with other elements:
>
> ## tc - Heading in a blockquote
>
> - List item in blockquote
> - Another list item
>
> ```
> Code block in blockquote
> ```

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>&gt; Blockquote with other elements:
&gt;
&gt; ## tc - Heading in a blockquote
&gt;
&gt; - List item in blockquote
&gt; - Another list item
&gt;
&gt; ```
&gt; Code block in blockquote
&gt; ```</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - blockquote - followed by text</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 50%">Input</th>
<th style="width: 50%">Actual Output</th>
</tr>
<tr>
<td>

> Blockquote followed by text.

Regular paragraph after a blockquote.

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>&gt; Blockquote followed by text.

Regular paragraph after a blockquote.</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - blockquote - character inline - not detef</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 50%">Input</th>
<th style="width: 50%">Actual Output</th>
</tr>
<tr>
<td>

Text with > character that is not a blockquote.

Paragraph with a line break and then a blockquote:

> This blockquote comes after a line break in a paragraph.

</td>
<td>



</td>
</tr>
<tr>
<td>

<pre><code>Text with &gt; character that is not a blockquote.

Paragraph with a line break and then a blockquote:

&gt; This blockquote comes after a line break in a paragraph.</code></pre>

</td>
<td>

<pre><code></code></pre>

</td>
</tr>
</table>

</details>

