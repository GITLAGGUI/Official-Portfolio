---
name: vision-dataset-review
description: "Prepare or review an image-detection or segmentation dataset and its evaluation evidence, preserving the supplied label definitions."
---

# Vision dataset review

Read the dataset specification, actual annotations and representative images before proposing a model or relabeling work. Preserve the originals and the requested label vocabulary.

Inspect boundary placement, missing objects, incorrect classes and ambiguous examples at usable resolution. Do not add an unsupported class or silently force uncertain pixels into a known disease or object class. Record uncertainty in the format the project supports.

Keep related sources together when splitting data: adjacent video frames, the same field, subject or capture session can leak across a random image split. Preserve a sealed evaluation set when one exists.

Choose metrics that match the error cost. Review precision and false positives alongside recall and aggregate scores. Compare predictions against authentic held-out examples, including negative and difficult cases. Keep training curves, dataset counts and configuration attached to the run they describe.

Deliver the reviewed annotations or code, the scope of changed files, the evaluation basis and visual evidence. Clearly separate a successful data conversion, a completed training run and a verified deployment result.
