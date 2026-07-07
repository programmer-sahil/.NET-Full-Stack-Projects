namespace StudentCourseManagement.Api.Helpers;

public class BadRequestException(string message) : Exception(message);

public class NotFoundException(string message) : Exception(message);

public class UnauthorizedRequestException(string message) : Exception(message);
