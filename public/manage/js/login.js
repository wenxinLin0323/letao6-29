$(function () {
  $("#lt-form").bootstrapValidator({
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh",
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空",
          },
          stringLength: {
            min: 3,
            max: 9,
            message: "用户名长度必须为3-9位",
          },
          callback: {
            message: "用户名不存在",
          },
        },
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空",
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须为6-12位",
          },
          callback: {
            message: "密码错误",
          },
        },
      },
    },
  });
  $("#lt-form").on("success.form.bv", function (e) {
    // 阻止表单的默认事件触发;
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/employee/employeeLogin",
      data: $("#lt-form").serialize(),
      dataType: "json",
      success: function (res) {
        console.log(res);
        if (res.success) {
          location.href = "./index.html";
        }
        if (res.error === 1000) {
          $("#lt-form")
            .data("bootstrapValidator")
            .updateStatus("username", "INVALID", "callback");
        }
        if (res.error === 1001) {
          $("#lt-form")
            .data("bootstrapValidator")
            .updateStatus("password", "INVALID", "callback");
        }
      },
    });
  });
  $(".btn-reset").click(function () {
    $("#lt-form").data("bootstrapValidator").resetForm();
  });
});
