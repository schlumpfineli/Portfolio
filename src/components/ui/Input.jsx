function Input({
  id,
  name,
  label,
  type = 'text',
  autoComplete = 'off',
  autoCorrect = 'off',
  spellCheck = false,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  state = 'default',
  showValidIcon = false,
  required = false,
  ...props
}) {
  const describedBy = error ? `${id}-error` : undefined
  const fieldClassName = `field field-${state}`.trim()
  const inputClassName = `input input-${state} ${error ? 'input-error' : ''}`.trim()

  return (
    <div className={fieldClassName}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="input-wrap">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          className={inputClassName}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...props}
        />
        {showValidIcon && <span className="input-valid-indicator" aria-hidden="true" />}
      </div>
      {error && (
        <p id={`${id}-error`} className="error-text">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
