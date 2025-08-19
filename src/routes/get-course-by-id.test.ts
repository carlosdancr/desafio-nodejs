import request from "supertest";
import { expect, test } from "vitest";

import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";
import { makeAuthenticateUser } from "../tests/factories/make-user.ts";

test("get course by id", async () => {
  await server.ready();

  const { token } = await makeAuthenticateUser("student");
  const course = await makeCourse();

  const response = await request(server.server)
    .get(`/courses/${course.id}`)
    .set("Authorization", token);

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: null,
    },
  });
});

test("return 404 for non existing courses", async () => {
  await server.ready();

  const { token } = await makeAuthenticateUser("student");

  const response = await request(server.server)
    .get(`/courses/2b56f38c-d1a1-4420-b7ac-01bf9a0860dc`)
    .set("Authorization", token);

  expect(response.status).toEqual(404);
});
