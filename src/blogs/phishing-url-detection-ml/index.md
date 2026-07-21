---
slug: phishing-url-detection-ml
title: "Building a Phishing URL Detector with Machine Learning"
date: "2026-07-01"
tags: ["machine-learning", "security", "python"]
excerpt: "How I built a phishing URL classifier using Python and scikit-learn — from feature engineering to a working model with 96% accuracy."
---

# Building a Phishing URL Detector with Machine Learning

Phishing URLs are one of the most common attack vectors in the wild. I built a classifier that flags malicious URLs with ~96% accuracy using traditional ML techniques — no deep learning required.

## The Problem

A phishing URL looks legitimate at first glance:
- `https://paypa1-secure.login.com/auth`
- `https://amazon-account-update.xyz/signin`

Humans miss these. A model can catch the patterns.

## Dataset

I used the **PhiUSIIL Phishing URL Dataset** from the UCI Machine Learning Repository — 235,795 URLs labeled as phishing or legitimate.

## Feature Engineering

Raw URLs aren't directly usable by ML models. I extracted 30+ features:

```python
def extract_features(url):
    parsed = urlparse(url)
    return {
        'url_length': len(url),
        'num_dots': url.count('.'),
        'num_hyphens': url.count('-'),
        'num_at': url.count('@'),
        'num_digits': sum(c.isdigit() for c in url),
        'has_ip': bool(re.match(r'\d+\.\d+\.\d+\.\d+', parsed.netloc)),
        'has_https': int(parsed.scheme == 'https'),
        'subdomain_depth': len(parsed.netloc.split('.')) - 2,
        'path_depth': parsed.path.count('/'),
        'has_suspicious_words': int(any(w in url.lower() 
            for w in ['login', 'secure', 'update', 'verify', 'bank'])),
        # ... 20+ more features
    }
```

## Model Selection

I tested several models:

| Model | Accuracy | F1 Score |
|---|---|---|
| Logistic Regression | 91.2% | 0.91 |
| Random Forest | 96.1% | 0.96 |
| XGBoost | 96.8% | 0.97 |
| SVM | 93.4% | 0.93 |

**Random Forest** won on the accuracy/explainability tradeoff.

## Results

- **Accuracy**: 96.1%
- **Precision**: 95.8%
- **Recall**: 96.4%
- **False Positive Rate**: 3.6% (legitimate URLs flagged as phishing)

The false positive rate is the most important metric in practice — you don't want to block legitimate sites.

## What I Learned

Feature engineering matters more than model choice for this problem. The difference between a 91% and 96% model was in the features, not the algorithm.

The full project is on [GitHub](https://github.com/rautepani/phishing-url-detector).
