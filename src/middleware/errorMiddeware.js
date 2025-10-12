export const errorHandler = (err, req, res, next) => {
  // Handle known errors
  if (err.message === 'Goal not found')
    return res.status(404).json({ error: err.message });
  if (err.message === 'Forbidden')
    return res.status(403).json({ error: err.message });
  if (err.message === 'Amount must be greater than 0')
    return res.status(400).json({ error: err.message });
  if (err.status === 409) return res.status(409).json({ error: err.message });

  return res.status(500).json({
    error: 'internal server error',
  });
};
