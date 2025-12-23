# Cursor Rules - Red Queen Code Review Pattern

This directory contains the Cursor rules implementation of the Red Queen Code Review Pattern - a self-evolving system for maintaining code quality standards through AI-human collaboration.

## Structure

```
.cursor/
├── README.md                    # This file
├── code-review.md               # Code review command (use @code-review.md in Cursor)
└── rules/
    ├── react-patterns.mdc       # React component architecture patterns
    ├── api-development.mdc     # API request patterns and HTTP client usage
    ├── code-quality.mdc         # Constants, error handling, logging, security
    ├── testing-accessibility.mdc # Testing patterns and WCAG compliance
    └── python-core-architecture.mdc # Python service layer and backend patterns
```

## Usage

### Running Code Reviews

In Cursor, use the `@code-review.md` command to analyze your code:

1. Open Cursor
2. Type `@code-review.md` in the chat
3. The AI will analyze your codebase against all rules in `.cursor/rules/`
4. Review the feedback and either:
   - **Fix the code** (if the rule is correct)
   - **Update the rule** (if the rule is outdated)

### The Feedback Loop

Every code review comment is either:
- **Validating a rule** → Fix the code
- **Exposing an outdated rule** → Update the rule

This creates a self-improving system where rules evolve with your codebase.

## Rule Files

### react-patterns.mdc
Covers React component architecture:
- Component structure and separation of concerns
- Component composition patterns
- Props and type safety
- State management
- Error boundaries
- Accessibility (ARIA)

### api-development.mdc
Covers API development patterns:
- HTTP client usage (HttpClient vs axios)
- HTTP status code constants
- Error handling
- Request configuration
- Response validation
- Authentication patterns
- Rate limiting

### code-quality.mdc
Covers general code quality:
- Constants vs magic numbers
- Error handling patterns
- Structured logging
- Type safety
- Null safety
- Code organization
- Security (no secrets in code)

### testing-accessibility.mdc
Covers testing and accessibility:
- Test patterns and assertions
- Test coverage (edge cases)
- WCAG 2.1 compliance
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast
- Accessibility testing tools

### python-core-architecture.mdc
Covers Python backend patterns:
- Error handling with specific exceptions
- Service layer pattern
- Decorators for cross-cutting concerns
- Type hints
- Database queries (parameterization)
- Configuration management
- Logging
- Async/await patterns
- Input validation

## Adding New Rules

When you encounter a pattern that should be standardized:

1. Add it to the appropriate `.mdc` file in `rules/`
2. Use the format:
   ```
   ❌ Never [bad pattern]:
   ```tsx
   // bad code example
   ```

   ✅ Always [good pattern]:
   ```tsx
   // good code example
   ```
   ```
3. Include concrete examples
4. Reference the rule in code review comments

## Updating Rules

When a rule becomes outdated:

1. Update the rule file directly
2. Include a comment explaining why the rule changed
3. The next code review will use the updated standard

## Benefits

- **Consistent Code**: AI generates code matching team standards
- **Faster Onboarding**: New developers learn patterns instantly
- **Less Bikeshedding**: Debates focus on whether rules need updating
- **Focus on Logic**: Reviewers focus on business logic, not style
- **Self-Evolving**: Rules adapt as patterns change
- **Documented Decisions**: Every pattern includes the "why"

## References

Based on the Red Queen Code Review Pattern:
https://dev.to/haco29/the-red-queen-code-review-pattern-perpetual-evolution-in-ai-powered-development-2ego

