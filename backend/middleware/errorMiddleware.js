const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ success: false, message: 'Invalid MongoDB ObjectId' });
  }

  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((item) => item.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }

  if (error.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate value entered' });
  }

  if (error.name === 'MongoServerError') {
    return res.status(500).json({ success: false, message: 'Database error' });
  }

  if (res.headersSent) {
    return next(error);
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server error',
  });
};

module.exports = { notFound, errorHandler };
