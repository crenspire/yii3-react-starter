<?php

declare(strict_types=1);

namespace App\Admin\User;

use App\Http\RequestData;
use Yiisoft\Validator\Result;
use Yiisoft\Validator\Rule\Callback;
use Yiisoft\Validator\Rule\Email;
use Yiisoft\Validator\Rule\In;
use Yiisoft\Validator\Rule\Length;
use Yiisoft\Validator\Rule\Required;
use Yiisoft\Validator\ValidatorInterface;

/**
 * Validates the user form in the admin area.
 */
final readonly class UserForm
{
    public string $name;
    public string $email;
    public string $role;
    public string $status;

    /**
     * @param array<string, mixed> $data
     */
    public function __construct(array $data)
    {
        $this->name = RequestData::string($data, 'name');
        $this->email = RequestData::string($data, 'email');
        $this->role = RequestData::string($data, 'role');
        $this->status = RequestData::string($data, 'status');
    }

    public function validate(ValidatorInterface $validator, UserRepository $users, ?int $userId = null): Result
    {
        return $validator->validate(
            [
                'name' => $this->name,
                'email' => $this->email,
                'role' => $this->role,
                'status' => $this->status,
            ],
            [
                'name' => [new Required(), new Length(max: 100)],
                'email' => [
                    new Required(),
                    new Email(),
                    new Callback(
                        static function (mixed $value) use ($users, $userId): Result {
                            $result = new Result();
                            if (is_string($value) && $value !== '' && $users->emailExists($value, $userId)) {
                                $result->addError('A user with this email already exists.');
                            }

                            return $result;
                        },
                    ),
                ],
                'role' => [new Required(), new In(UserRepository::ROLES)],
                'status' => [new Required(), new In(UserRepository::STATUSES)],
            ],
        );
    }
}
