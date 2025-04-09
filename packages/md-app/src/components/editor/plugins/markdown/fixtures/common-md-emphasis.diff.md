# Diff Results for common-md-emphasis

## Test Summary

- 🟢 Perfect roundtrip (input = output): 7/11 (64%)
- 🟡 Acceptable transformation (output ≠ input, output = expected): 3/11 (27%)
- 🔴 Failing test (output ≠ input, output ≠ expected): 1/11 (9%)

**Overall Status**: ❌ 1 failing tests

---

<details >
<summary><span style="color:green; font-weight:bold;">tc - italic with asterisks</span> 🟢 <span title="Input = Output?">✅</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 100%">Input / Output (identical)</th>
</tr>
<tr>
<td>

*Italic text* using single asterisks.

</td>
</tr>
<tr>
<td>

<pre><code>*Italic text* using single asterisks.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:#cc7700; font-weight:bold;">tc - italic with underscores</span> 🟡 <span title="Input = Output?">⚠️</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 33%">Original Input</th>
<th style="width: 33%">Expected Output</th>
<th style="width: 33%">Actual Output</th>
</tr>
<tr>
<td>

_Italic text_ using single underscores.

</td>
<td>

*Italic text* using single underscores.

</td>
<td>

*Italic text* using single underscores.

</td>
</tr>
<tr>
<td>

<pre><code>_Italic text_ using single underscores.</code></pre>

</td>
<td>

<pre><code>*Italic text* using single underscores.</code></pre>

</td>
<td>

<pre><code>*Italic text* using single underscores.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:green; font-weight:bold;">tc - bold with asterisks</span> 🟢 <span title="Input = Output?">✅</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 100%">Input / Output (identical)</th>
</tr>
<tr>
<td>

**Bold text** using double asterisks.

</td>
</tr>
<tr>
<td>

<pre><code>**Bold text** using double asterisks.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:#cc7700; font-weight:bold;">tc - bold with underscores</span> 🟡 <span title="Input = Output?">⚠️</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 33%">Original Input</th>
<th style="width: 33%">Expected Output</th>
<th style="width: 33%">Actual Output</th>
</tr>
<tr>
<td>

__Bold text__ using double underscores.

</td>
<td>

**Bold text** using double underscores.

</td>
<td>

**Bold text** using double underscores.

</td>
</tr>
<tr>
<td>

<pre><code>__Bold text__ using double underscores.</code></pre>

</td>
<td>

<pre><code>**Bold text** using double underscores.</code></pre>

</td>
<td>

<pre><code>**Bold text** using double underscores.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:green; font-weight:bold;">tc - bold-italic with asterisks</span> 🟢 <span title="Input = Output?">✅</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 100%">Input / Output (identical)</th>
</tr>
<tr>
<td>

***Bold and italic*** using triple asterisks.

</td>
</tr>
<tr>
<td>

<pre><code>***Bold and italic*** using triple asterisks.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:#cc7700; font-weight:bold;">tc - bold-italic with underscores</span> 🟡 <span title="Input = Output?">⚠️</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 33%">Original Input</th>
<th style="width: 33%">Expected Output</th>
<th style="width: 33%">Actual Output</th>
</tr>
<tr>
<td>

___Bold and italic___ using triple underscores.

</td>
<td>

***Bold and italic*** using triple underscores.

</td>
<td>

***Bold and italic*** using triple underscores.

</td>
</tr>
<tr>
<td>

<pre><code>___Bold and italic___ using triple underscores.</code></pre>

</td>
<td>

<pre><code>***Bold and italic*** using triple underscores.</code></pre>

</td>
<td>

<pre><code>***Bold and italic*** using triple underscores.</code></pre>

</td>
</tr>
</table>

</details>

<details open>
<summary><span style="color:red; font-weight:bold;">tc - mixed formatting inline - nested</span> 🔴 <span title="Input = Output?">❌</span> <span title="Visual match?">❌</span></summary>

<table>
<tr>
<th style="width: 50%">Input</th>
<th style="width: 50%">Actual Output</th>
</tr>
<tr>
<td>

**Bold text with *italic* inside**.

</td>
<td>

**Bold text with *italic*** **inside**.

</td>
</tr>
<tr>
<td>

<pre><code>**Bold text with *italic* inside**.</code></pre>

</td>
<td>

<pre><code>**Bold text with *italic*** **inside**.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:green; font-weight:bold;">tc - mixed formatting inline - not nested</span> 🟢 <span title="Input = Output?">✅</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 100%">Input / Output (identical)</th>
</tr>
<tr>
<td>

**Bold text with** ***italic*** **not nested**.

</td>
</tr>
<tr>
<td>

<pre><code>**Bold text with** ***italic*** **not nested**.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:green; font-weight:bold;">tc - italic with bold inside</span> 🟢 <span title="Input = Output?">✅</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 100%">Input / Output (identical)</th>
</tr>
<tr>
<td>

*Italic text with **bold** inside*.

</td>
</tr>
<tr>
<td>

<pre><code>*Italic text with **bold** inside*.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:green; font-weight:bold;">tc - strikethrough</span> 🟢 <span title="Input = Output?">✅</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 100%">Input / Output (identical)</th>
</tr>
<tr>
<td>

~~Strikethrough text~~ using double tildes.

</td>
</tr>
<tr>
<td>

<pre><code>~~Strikethrough text~~ using double tildes.</code></pre>

</td>
</tr>
</table>

</details>

<details >
<summary><span style="color:green; font-weight:bold;">tc - mixed styles in paragraph</span> 🟢 <span title="Input = Output?">✅</span> <span title="Visual match?">✅</span></summary>

<table>
<tr>
<th style="width: 100%">Input / Output (identical)</th>
</tr>
<tr>
<td>

Mixed **bold** and *italic* and ~~strikethrough~~ in one paragraph.

</td>
</tr>
<tr>
<td>

<pre><code>Mixed **bold** and *italic* and ~~strikethrough~~ in one paragraph.</code></pre>

</td>
</tr>
</table>

</details>

