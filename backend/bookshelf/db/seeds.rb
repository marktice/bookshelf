books = [
  {
      title: 'The Soul of America: The Battle for Our Better Angels',
      description: 'Pulitzer Prize–winning author Jon Meacham helps us understand the present moment in American politics and life by looking back at critical times in our history when hope overcame division and fear.',
      isbn: '0399589813'
  },
  {
      title: 'Oh, the Places You\'ll Go!',
      description: 'Dr. Seuss’s wonderfully wise Oh, the Places You’ll Go! is the perfect send-off for grads—from nursery school, high school, college, and beyond!',
      isbn: '0679805273'
  }
]

Book.create!(books) {|b| p b.title}