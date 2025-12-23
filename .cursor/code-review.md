# Code Review Command

Analyze the current codebase against our documented standards in `.cursor/rules/`.

## Review Process

1. **Check against rules**: Review code against patterns in:
   - `react-patterns.mdc` - Component architecture
   - `api-development.mdc` - API patterns
   - `code-quality.mdc` - Constants, errors, logging
   - `testing-accessibility.mdc` - Testing & WCAG standards
   - `python-core-architecture.mdc` - Backend patterns

2. **Identify violations**: For each violation found:
   - Specify the file and line number
   - Reference the exact rule violated
   - Provide a concrete suggestion with code example

3. **Format feedback**: Use this structure:
   ```
   ### [File Path]
   
   **Issue:** [Brief description]
   **Rule Violated:** [rule-file.mdc] - "[Rule description]"
   **Suggestion:** [How to fix with code example]
   ```

## The Feedback Loop

When reviewing code, ask: **Is the rule right?**

- **If yes** → Fix the code
- **If no** → Update the rule

This creates a self-improving system where rules evolve with the codebase.

## Example Output

```
### src/components/UserProfile.tsx

**Issue:** Using axios directly instead of HttpClient
**Rule Violated:** api-development.mdc - "Always use HttpClient for API requests"
**Suggestion:** Replace axios with HttpClient static methods

```tsx
// Before
import axios from 'axios';
const data = await axios.get('/api/users');

// After
import { HttpClient } from '@/lib/http-client';
const users = await HttpClient.getUsers();
```

---

### src/utils/dateHelpers.ts

**Issue:** Magic number used for timeout
**Rule Violated:** code-quality.mdc - "Never use magic numbers"
**Suggestion:** Extract to named constant

```tsx
// Before
setTimeout(() => refreshData(), 5000);

// After
import { DATA_REFRESH_INTERVAL_MS } from '@/constants';
setTimeout(() => refreshData(), DATA_REFRESH_INTERVAL_MS);
```
```

## Focus Areas

Prioritize finding:
- Architecture violations (logic in wrong layer)
- Missing patterns (forgot to use our HttpClient)
- Security issues (hardcoded secrets)
- Accessibility problems (missing ARIA labels)
- Type safety issues (use of `any`)
- Error handling gaps

## Remember

Every code review comment is either:
- **Validating a rule** → Fix the code
- **Exposing an outdated rule** → Update the rule

Either way, the system evolves.

