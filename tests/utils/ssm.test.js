/* eslint-env jest */
const AWS = require("aws-sdk");

jest.mock("aws-sdk", () => {
    const mockSSM = {
        getParameter: jest.fn()
    };
    return {
        config: {
            update: jest.fn()
        },
        SSM: jest.fn(() => mockSSM)
    };
});

const { getParam } = require("../../server/utils/ssm");

describe("getParam", () => {
    const mockValue = {
        Parameter: {
            Name: "StripeSecretKey",
            Type: "SecureString",
            Value: "myVal",
            Version: 1,
            LastModifiedDate: 1530018761.888,
            ARN: "arn:aws:ssm:us-east-1:123456789012:parameter/helloSecureWorld",
        }
    };

    let originalEnv;

    beforeEach(() => {
        originalEnv = process.env.NODE_ENV;
        jest.clearAllMocks();
    });

    afterEach(() => {
        process.env.NODE_ENV = originalEnv;
    });

    it("should return mocked parameter in LOCAL environment", async () => {
        process.env.NODE_ENV = "LOCAL";

        const result = await getParam("SomeParamName");
        expect(result).toEqual(mockValue);
    });

    it("should call AWS SSM getParameter for non-LOCAL environments", async () => {
        process.env.NODE_ENV = "production";

        const ssmInstance = new AWS.SSM();
        const mockAWSReturn = {
            promise: jest.fn().mockResolvedValue(mockValue)
        };

        ssmInstance.getParameter.mockReturnValue(mockAWSReturn);

        const result = await getParam("RealParamName");

        expect(ssmInstance.getParameter).toHaveBeenCalledWith({
            Name: "RealParamName",
            WithDecryption: true
        });
        expect(result).toEqual(mockValue);
    });
});
