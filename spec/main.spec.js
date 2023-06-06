import * as dateutils from "../scripts/modules/dateutils.mjs";

//npm test

it("MS converter test", () => {
    expect(dateutils.msToTime(5000)).toBe("00:00:00:05");
    expect(dateutils.msToTime(10000)).toBe("00:00:00:10");
    expect(dateutils.msToTime(900)).toBe("00:00:00:00");
    expect(dateutils.msToTime(60*1000)).toBe("00:00:01:00");
});